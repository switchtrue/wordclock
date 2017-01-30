// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as WordClockActions from '../actions/wordclock';
import Letter from '../components/Letter';
import styles from './WordClock.css';

function mapStateToProps(state) {
  return {
    wordclock: state.wordclock
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(WordClockActions, dispatch);
}

class WordClock extends Component {

  componentDidMount = () => {
    var my_http = require("http");
    var setNeoPixelArray = this.props.setNeoPixelArray;

    my_http.createServer(function(request, response){
      var body = '';
      request.on('data', function(data) {
        body += data;
      });
      request.on('end', function() {
        const jsonBody = JSON.parse(body)
        setNeoPixelArray(jsonBody.neoPixelArray);
        console.log(jsonBody);
      });

      response.writeHeader(200, {"Content-Type": "text/plain"});
      response.write("OK");
      response.end();
    }).listen(8080);
  }

  toggleDisplayMode = () => {
    if (this.props.wordclock.displayMode === 'LETTER') {
      this.props.setDisplayMode('IDX');
    } else if (this.props.wordclock.displayMode === 'IDX') {
      this.props.setDisplayMode('LETTER');
    }
  }

  render() {

    const np = this.props.wordclock.neoPixelArray;
    const displayMode = this.props.wordclock.displayMode;

    return (
      <div className={styles.container} onDoubleClick={this.toggleDisplayMode}>
        <div className={styles.row}>
          <Letter letter="I" color={np[0]} idx={0} mode={displayMode} />
          <Letter letter="T" color={np[1]} idx={1} mode={displayMode} />
          <Letter letter="Z" color={np[2]} idx={2} mode={displayMode} />
          <Letter letter="I" color={np[3]} idx={3} mode={displayMode} />
          <Letter letter="S" color={np[4]} idx={4} mode={displayMode} />
          <Letter letter="T" color={np[5]} idx={5} mode={displayMode} />
          <Letter letter="H" color={np[6]} idx={6} mode={displayMode} />
          <Letter letter="A" color={np[7]} idx={7} mode={displayMode} />
          <Letter letter="L" color={np[8]} idx={8} mode={displayMode} />
          <Letter letter="F" color={np[9]} idx={9} mode={displayMode} />
          <Letter letter="B" color={np[10]} idx={10} mode={displayMode} />
        </div>
        <div className={styles.row}>
          <Letter letter="N" color={np[11]} idx={11} mode={displayMode} />
          <Letter letter="T" color={np[12]} idx={12} mode={displayMode} />
          <Letter letter="E" color={np[13]} idx={13} mode={displayMode} />
          <Letter letter="N" color={np[14]} idx={14} mode={displayMode} />
          <Letter letter="Q" color={np[15]} idx={15} mode={displayMode} />
          <Letter letter="U" color={np[16]} idx={16} mode={displayMode} />
          <Letter letter="A" color={np[17]} idx={17} mode={displayMode} />
          <Letter letter="R" color={np[18]} idx={18} mode={displayMode} />
          <Letter letter="T" color={np[19]} idx={19} mode={displayMode} />
          <Letter letter="E" color={np[20]} idx={20} mode={displayMode} />
          <Letter letter="R" color={np[21]} idx={21} mode={displayMode} />
        </div>
        <div className={styles.row}>
          <Letter letter="T" color={np[22]} idx={22} mode={displayMode} />
          <Letter letter="W" color={np[23]} idx={23} mode={displayMode} />
          <Letter letter="E" color={np[24]} idx={24} mode={displayMode} />
          <Letter letter="N" color={np[25]} idx={25} mode={displayMode} />
          <Letter letter="T" color={np[26]} idx={26} mode={displayMode} />
          <Letter letter="Y" color={np[27]} idx={27} mode={displayMode} />
          <Letter letter="P" color={np[28]} idx={28} mode={displayMode} />
          <Letter letter="F" color={np[29]} idx={29} mode={displayMode} />
          <Letter letter="I" color={np[30]} idx={30} mode={displayMode} />
          <Letter letter="V" color={np[31]} idx={31} mode={displayMode} />
          <Letter letter="E" color={np[32]} idx={32} mode={displayMode} />
        </div>
        <div className={styles.row}>
          <Letter letter="W" color={np[33]} idx={33} mode={displayMode} />
          <Letter letter="A" color={np[34]} idx={34} mode={displayMode} />
          <Letter letter="Y" color={np[35]} idx={35} mode={displayMode} />
          <Letter letter="T" color={np[36]} idx={36} mode={displayMode} />
          <Letter letter="O" color={np[37]} idx={37} mode={displayMode} />
          <Letter letter="L" color={np[38]} idx={38} mode={displayMode} />
          <Letter letter="P" color={np[39]} idx={39} mode={displayMode} />
          <Letter letter="A" color={np[40]} idx={40} mode={displayMode} />
          <Letter letter="S" color={np[41]} idx={41} mode={displayMode} />
          <Letter letter="T" color={np[42]} idx={42} mode={displayMode} />
          <Letter letter="Z" color={np[43]} idx={43} mode={displayMode} />
        </div>
        <div className={styles.row}>
          <Letter letter="O" color={np[44]} idx={44} mode={displayMode} />
          <Letter letter="S" color={np[45]} idx={45} mode={displayMode} />
          <Letter letter="E" color={np[46]} idx={46} mode={displayMode} />
          <Letter letter="V" color={np[47]} idx={47} mode={displayMode} />
          <Letter letter="E" color={np[48]} idx={48} mode={displayMode} />
          <Letter letter="N" color={np[49]} idx={49} mode={displayMode} />
          <Letter letter="Y" color={np[50]} idx={50} mode={displayMode} />
          <Letter letter="N" color={np[51]} idx={51} mode={displayMode} />
          <Letter letter="O" color={np[52]} idx={52} mode={displayMode} />
          <Letter letter="O" color={np[53]} idx={53} mode={displayMode} />
          <Letter letter="N" color={np[54]} idx={54} mode={displayMode} />
        </div>
        <div className={styles.row}>
          <Letter letter="K" color={np[55]} idx={55} mode={displayMode} />
          <Letter letter="B" color={np[56]} idx={56} mode={displayMode} />
          <Letter letter="I" color={np[57]} idx={57} mode={displayMode} />
          <Letter letter="R" color={np[58]} idx={58} mode={displayMode} />
          <Letter letter="T" color={np[59]} idx={59} mode={displayMode} />
          <Letter letter="H" color={np[60]} idx={60} mode={displayMode} />
          <Letter letter="D" color={np[61]} idx={61} mode={displayMode} />
          <Letter letter="A" color={np[62]} idx={62} mode={displayMode} />
          <Letter letter="Y" color={np[63]} idx={63} mode={displayMode} />
          <Letter letter="W" color={np[64]} idx={64} mode={displayMode} />
          <Letter letter="T" color={np[65]} idx={65} mode={displayMode} />
        </div>
        <div className={styles.row}>
          <Letter letter="M" color={np[66]} idx={66} mode={displayMode} />
          <Letter letter="I" color={np[67]} idx={67} mode={displayMode} />
          <Letter letter="D" color={np[68]} idx={68} mode={displayMode} />
          <Letter letter="N" color={np[69]} idx={69} mode={displayMode} />
          <Letter letter="I" color={np[70]} idx={70} mode={displayMode} />
          <Letter letter="G" color={np[71]} idx={71} mode={displayMode} />
          <Letter letter="H" color={np[72]} idx={72} mode={displayMode} />
          <Letter letter="T" color={np[73]} idx={73} mode={displayMode} />
          <Letter letter="T" color={np[74]} idx={74} mode={displayMode} />
          <Letter letter="E" color={np[75]} idx={75} mode={displayMode} />
          <Letter letter="N" color={np[76]} idx={76} mode={displayMode} />
        </div>
        <div className={styles.row}>
          <Letter letter="F" color={np[77]} idx={77} mode={displayMode} />
          <Letter letter="I" color={np[78]} idx={78} mode={displayMode} />
          <Letter letter="V" color={np[79]} idx={79} mode={displayMode} />
          <Letter letter="E" color={np[80]} idx={80} mode={displayMode} />
          <Letter letter="N" color={np[81]} idx={81} mode={displayMode} />
          <Letter letter="I" color={np[82]} idx={82} mode={displayMode} />
          <Letter letter="N" color={np[83]} idx={83} mode={displayMode} />
          <Letter letter="E" color={np[84]} idx={84} mode={displayMode} />
          <Letter letter="T" color={np[85]} idx={85} mode={displayMode} />
          <Letter letter="W" color={np[86]} idx={86} mode={displayMode} />
          <Letter letter="O" color={np[87]} idx={87} mode={displayMode} />
        </div>
        <div className={styles.row}>
          <Letter letter="E" color={np[88]} idx={88} mode={displayMode} />
          <Letter letter="L" color={np[89]} idx={89} mode={displayMode} />
          <Letter letter="E" color={np[90]} idx={90} mode={displayMode} />
          <Letter letter="V" color={np[91]} idx={91} mode={displayMode} />
          <Letter letter="E" color={np[92]} idx={92} mode={displayMode} />
          <Letter letter="N" color={np[93]} idx={93} mode={displayMode} />
          <Letter letter="E" color={np[94]} idx={94} mode={displayMode} />
          <Letter letter="I" color={np[95]} idx={95} mode={displayMode} />
          <Letter letter="G" color={np[96]} idx={96} mode={displayMode} />
          <Letter letter="H" color={np[97]} idx={97} mode={displayMode} />
          <Letter letter="T" color={np[98]} idx={98} mode={displayMode} />
        </div>
        <div className={styles.row}>
          <Letter letter="O" color={np[99]} idx={99} mode={displayMode} />
          <Letter letter="N" color={np[100]} idx={100} mode={displayMode} />
          <Letter letter="E" color={np[101]} idx={101} mode={displayMode} />
          <Letter letter="S" color={np[102]} idx={102} mode={displayMode} />
          <Letter letter="I" color={np[103]} idx={103} mode={displayMode} />
          <Letter letter="X" color={np[104]} idx={104} mode={displayMode} />
          <Letter letter="T" color={np[105]} idx={105} mode={displayMode} />
          <Letter letter="H" color={np[106]} idx={106} mode={displayMode} />
          <Letter letter="R" color={np[107]} idx={107} mode={displayMode} />
          <Letter letter="E" color={np[108]} idx={108} mode={displayMode} />
          <Letter letter="E" color={np[109]} idx={109} mode={displayMode} />
        </div>
        <div className={styles.row}>
          <Letter letter="F" color={np[110]} idx={110} mode={displayMode} />
          <Letter letter="O" color={np[111]} idx={111} mode={displayMode} />
          <Letter letter="U" color={np[112]} idx={112} mode={displayMode} />
          <Letter letter="R" color={np[113]} idx={113} mode={displayMode} />
          <Letter letter="Z" color={np[114]} idx={114} mode={displayMode} />
          <Letter letter="O" color={np[115]} idx={115} mode={displayMode} />
          <Letter letter="C" color={np[116]} idx={116} mode={displayMode} />
          <Letter letter="L" color={np[117]} idx={117} mode={displayMode} />
          <Letter letter="O" color={np[118]} idx={118} mode={displayMode} />
          <Letter letter="C" color={np[119]} idx={119} mode={displayMode} />
          <Letter letter="K" color={np[120]} idx={120} mode={displayMode} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WordClock);
