import { Artifact, ArtifactId } from '@darkforest_eth/types';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ReaderDataStore from '../../Backend/Storage/ReaderDataStore';
import { Share } from '../Views/Share';

export function ShareArtifact({ match }: RouteComponentProps<{ artifactId: ArtifactId }>) {
  function load(dataStore: ReaderDataStore) {
    return dataStore.loadArtifactFromContract(match.params.artifactId);
  }

  return (
    <Share load={load}>
      {(artifact: Artifact | undefined, loading: boolean, error: Error | undefined) => {
        if (error) {
          return 'error';
        }

        if (loading) {
          return 'loading';
        }

        return JSON.stringify(artifact);
      }}
    </Share>
  );
}
