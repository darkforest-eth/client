import { h, Component } from 'preact'
import { addHours, formatDistanceToNow, fromUnixTime, isAfter } from 'date-fns'
import { addMilliseconds } from 'date-fns/esm'

export class ManageInterval extends Component
{
  timer: NodeJS.Timeout
  state: { inc: number }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        inc: this.state.inc + 1
      })
    }, 1000)
  }

  render({ interval }: { interval: any })
  {
    const nextTickDate = addMilliseconds(new Date(), interval.next())
    const nextTick = formatDistanceToNow(nextTickDate, { includeSeconds: true })

    return (
      <div style={{ marginTop: '5px', marginBottom: '5px' }}>
        {interval.isPaused()
          ? <a href="#" onClick={() => interval.resume()}>⏯️</a>
          : <span>Next Tick in {nextTick} <a href="#" onClick={() => interval.pause()}>⏸</a></span>
        }
      </div>
    )
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
}
