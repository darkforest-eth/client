import { ArtifactRarity, EthAddress } from "@darkforest_eth/types";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Spacer } from "../Components/CoreUI";
import { TwitterLink } from "../Components/Labels/Labels";
import { LoadingSpinner } from "../Components/LoadingSpinner";
import { Red } from "../Components/Text";
import { TextPreview } from "../Components/TextPreview";
import { RarityColors } from "../Styles/Colors";
import dfstyles from "../Styles/dfstyles";
import { useLeaderboard } from "../Utils/AppHooks";
import { formatDuration } from "../Utils/TimeUtils";
import { GenericErrorBoundary } from "./GenericErrorBoundary";
// import { Table } from "./Table";
import {
  Leaderboard,
  LeaderboardEntry,
} from "../../Backend/Network/LeaderboardApi";
import { getPlayerColor } from "../../Backend/Utils/Utils";

export function LeadboardDisplay() {
  const { leaderboard, error } = useLeaderboard();
  console.log(leaderboard);

  const errorMessage = "Error Loading Leaderboard";

  return (
    <GenericErrorBoundary errorMessage={errorMessage}>
      {!leaderboard && !error && (
        <LoadingSpinner initialText={"Loading Leaderboard..."} />
      )}
      {leaderboard && <LeaderboardBody leaderboard={leaderboard} />}
      {error && <Red>{errorMessage}</Red>}
    </GenericErrorBoundary>
  );
}

function scoreToString(score?: number | null) {
  if (score === null || score === undefined) {
    return "n/a";
  }
  score = Math.floor(score);
  if (score < 10000) {
    return score + "";
  }

  return score.toLocaleString();
}

// pass in either an address, or a twitter handle. this function will render the appropriate
// component
function playerToEntry(playerStr: string, color: string) {
  // if this is an address
  if (playerStr.startsWith("0x") && playerStr.length === 42) {
    return (
      <TextPreview
        text={playerStr}
        focusedWidth={"150px"}
        unFocusedWidth={"150px"}
      />
    );
  }

  return <TwitterLink twitter={playerStr} color={color} />;
}

function getRankColor([rank, score]: [number, number | undefined]) {
  if (score === undefined || score === null || score == 0) {
    return dfstyles.colors.subtext;
  }

  if (rank === 0) {
    return RarityColors[ArtifactRarity.Mythic];
  }

  if (rank === 1 || rank === 2) {
    return RarityColors[ArtifactRarity.Legendary];
  }

  if (rank >= 3 && rank <= 6) {
    return RarityColors[ArtifactRarity.Epic];
  }

  return "white";

  if (rank >= 7 && rank <= 14) {
    return RarityColors[ArtifactRarity.Rare];
  }

  if (rank >= 15 && rank <= 30) {
    return dfstyles.colors.dfgreen;
  }

  if (rank >= 31 && rank <= 62) {
    return "white";
  }

  return dfstyles.colors.subtext;
}

function roundToDecimal(num: number, decimalCount = 1) {
  if (decimalCount < 1) return Math.round(num);
  let p = Math.pow(10, decimalCount);
  num = num * p;
  num = Math.round(num) / p;
  return num;
}

function formatNumberForDisplay(num: number, decimalCount = 1) {
  if (num < 1e3) return roundToDecimal(num, decimalCount);
  if (num < 1e6) return roundToDecimal(num / 1e3, decimalCount) + "k";
  if (num < 1e9) return roundToDecimal(num / 1e6, decimalCount) + "m";
  if (num < 1e12) return roundToDecimal(num / 1e9, decimalCount) + "b";
  return roundToDecimal(num / 1e12, decimalCount) + "t";
}

enum SortColumn {
  SilverArtifacts,
  FromCenter,
  DestroyedPlanets,
}

enum SortDir {
  Ascending,
  Descending,
}

function LeaderboardTable({ entries }: { entries: LeaderboardEntry[] }) {
  const [sort, setSort] = useState(SortColumn.SilverArtifacts);
  const [sortDir, setSortDir] = useState(SortDir.Descending);

  const sortStyle = (col: SortColumn) => {
    const cursor = "pointer";
    if (sort === col) return { color: dfstyles.colors.dfyellow, cursor };
    return { cursor };
  };

  const toggleSortDir = () => {
    if (sortDir === SortDir.Ascending) setSortDir(SortDir.Descending);
    if (sortDir === SortDir.Descending) setSortDir(SortDir.Ascending);
  };

  const sortDesc = () => {
    if (sortDir !== SortDir.Descending) setSortDir(SortDir.Descending);
  };

  const sortByColumn = (col: SortColumn) => {
    if (sort !== col) {
      sortDesc();
      setSort(col);
    } else {
      // toggleSortDir();
    }
  };

  const sortEntries = () => {
    const asc = sortDir === SortDir.Ascending;
    const maxDistance = 512000;

    return entries.sort((a, b) => {
      switch (sort) {
        case SortColumn.DestroyedPlanets:
          if (asc) return (a.destroyedScore || 0) - (b.destroyedScore || 0);
          else return (b.destroyedScore || 0) - (a.destroyedScore || 0);
        case SortColumn.FromCenter:
          if (asc) {
            return (
              (b.distanceToCenter || maxDistance) -
              (a.distanceToCenter || maxDistance)
            );
          } else {
            return (
              (a.distanceToCenter || maxDistance) -
              (b.distanceToCenter || maxDistance)
            );
          }
        case SortColumn.SilverArtifacts:
        default:
          if (asc) return (a.silverArtifacts || 0) - (b.silverArtifacts || 0);
          else return (b.silverArtifacts || 0) - (a.silverArtifacts || 0);
      }
    });
  };

  const getPlace = (position: number) => {
    if (sortDir === SortDir.Descending) return position + 1;
    else return entries.length - position;
  };

  const entriesSorted = sortEntries();

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>place</Th>
            <Th>player</Th>
            <Th
              style={sortStyle(SortColumn.SilverArtifacts)}
              onClick={() => sortByColumn(SortColumn.SilverArtifacts)}
            >
              silver + artifacts
            </Th>
            <Th
              style={sortStyle(SortColumn.FromCenter)}
              onClick={() => sortByColumn(SortColumn.FromCenter)}
            >
              from center
            </Th>
            <Th
              style={sortStyle(SortColumn.DestroyedPlanets)}
              onClick={() => sortByColumn(SortColumn.DestroyedPlanets)}
            >
              destroyed planets
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {entriesSorted.map((entry, i) => {

            const distance =
              entry.distanceToCenter === undefined
                ? "-"
                : formatNumberForDisplay(entry.distanceToCenter || 0);

            var score;
            switch (sort) {
              case SortColumn.DestroyedPlanets:
                score = entry.destroyedScore;
                break;
              case SortColumn.FromCenter:
                score = entry.distanceToCenter;
                break;
              default:
                score = entry.silverArtifacts;
            }
            const color = getRankColor([i, score]);
            return (
              <Tr key={i}>
                <Td style={{ color }}>{getPlace(i)}.</Td>
                <Td style={{ color }}>
                  {getTwitterName(entry.twitter) ||
                    entry.ethAddress.substr(0, 12)}
                </Td>
                <Td style={{ color }}>
                  {formatNumberForDisplay(entry.silverArtifacts || 0)}
                </Td>
                <Td style={{ color }}>{distance}</Td>
                <Td style={{ color }}>
                  {formatNumberForDisplay(entry.destroyedScore || 0)}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

const getTwitterName = (name?: string) => {
  if (!name) return null;
  return <a href={`https://twitter.com/${name}`}>@{name.substr(0, 12)}</a>;
};

const Table = styled.table``;
const Thead = styled.thead``;
const Tbody = styled.tbody``;
const Tr = styled.tr``;
const Th = styled.th`
  padding: 4px 16px;
  text-align: left;
`;
const Td = styled.td`
  padding: 4px 16px;
  color: ${dfstyles.colors.text};
`;

// TODO: update this each round, or pull from contract constants
const roundEndTimestamp = "2022-01-05T07:59:59.000Z";
const roundEndTime = new Date(roundEndTimestamp).getTime();

function CountDown() {
  const [str, setStr] = useState("");

  const update = () => {
    const timeUntilEndms = roundEndTime - new Date().getTime();
    if (timeUntilEndms <= 0) {
      setStr("yes");
    } else {
      setStr(formatDuration(timeUntilEndms));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      update();
    }, 499);

    update();

    return () => clearInterval(interval);
  }, []);

  return <>{str}</>;
}

function LeaderboardBody({ leaderboard }: { leaderboard: Leaderboard }) {
  return (
    <div>
      <StatsTableContainer>
        <StatsTable>
          <tbody>
            <tr>
              <td>Round complete</td>
              <td>
                <CountDown />
              </td>
            </tr>
            <tr>
              <td>players</td>
              <td>{leaderboard.entries.length}</td>
            </tr>
          </tbody>
        </StatsTable>
      </StatsTableContainer>
      <Spacer height={8} />
      <LeaderboardTable entries={leaderboard.entries} />
    </div>
  );
}

const TableContainer = styled.div`
  display: inline-block;
  border-radius: 2px 2px 0 0px;
  border-bottom: none;
  padding: 16px;
`;

const StatsTableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${dfstyles.colors.text};
`;

const StatsTable = styled.table`
  td {
    padding: 4px 8px;

    &:first-child {
      text-align: right;
      color: ${dfstyles.colors.subtext};
    }

    &:last-child {
      text-align: left;
    }
  }
`;
