import React, { useState, useEffect, } from 'react';

const styles = {
  block: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'stretch',
    alignItems: 'stretch',
    marginTop: 16,
    marginBottom: 16,
    border: '1px solid #050505',
    color: '#050505',
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 8,
    fontSize: '0.9rem',
    fontFamily: 'sans-serif',
  },

  pipeline: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  process: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: '33%',
    padding: 8,
  },

  comms: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    minWidth: 48,
    paddingTop: 8,
  },

  comm_positive: {
    display: 'flex',
    justifyContent: 'center',
    padding: 4,
    backgroundColor: 'mediumseagreen',
  },

  comm_negative: {
    display: 'flex',
    justifyContent: 'center',
    minWidth: 32,
    minHeight: 32,
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: 'tomato',
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 8,
  },

  row_header: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 4,
  },

  row_log: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 4,
  },

  button: {
    fontSize: '1em',
    padding: 8,
    marginRight: 4,
  },

  h4: {
    margin: 0,
    fontSize: '1.2em',
    fontWeight: 'normal',
  },

  ul: {
    padding: 0,
    flexBasis: '33%',
    flexShrink: 0,
    flexGrow: 0,
  },
};

const defaultState = {
  value: null,
  originEventId: null,
  hasConflict: false,
  conflictingValues: [],
};

function reducer(state = defaultState, event) {
  const conflictInfo = {
    hasConflict: false,
    conflictingValues: [],
  };

  if (
    state &&
    state.originEventId &&
    state.originEventId > event.originEventId &&
    state.value !== event.data.value
  ) {
    const values = state.value ? [ state.value ] : state.conflictingValues;
    return {
      ...state,
      hasConflict: true,
      conflictingValues: values.concat([event.data.value]),
      value: state.value,
    };
  }

  return {
    ...state,
    value: event.data.value,
    originEventId: event.originEventId,
    hasConflict: false,
    conflictingValues: [],
  };
}


function sync({
  from,
  to,
  setFrom,
  setTo,
  fromReplica,
  toReplica,
}) {
  const toAppend = [];
  const fromAppend = [];

  for (let event of from) {
    if (!to.find(e => e.originEventId === event.originEventId)) {
      toAppend.push({
        ...event,
        localEventId: genId(toReplica),
      });
    }
  }

  for (let event of to) {
    if (!from.find(e => e.originEventId === event.originEventId)) {
      fromAppend.push({
        ...event,
        localEventId: genId(fromReplica),
      });
    }
  }

  setTo(to.concat(toAppend));
  setFrom(from.concat(fromAppend));
}

function getTime(id) {
  const idPart = id.split('@')[0];
  return idPart.split('.')[0];
}

function getSeq(id) {
  const idPart = id.split('@')[0];
  return Number(idPart.split('.').slice(-1)[0]);
}

const lastIdByReplica = {

};

function genId(replica) {
  const d = new Date();
  const newTime = (
    `${d.getMinutes()}:` +
    `${d.getSeconds()}`
  );
  let newSeq = 0;
  const last = lastIdByReplica[replica];
  if (last && getTime(last) === newTime) {
    newSeq = getSeq(last) + 1;
  }
  const newId = `${newTime}.${newSeq}@${replica}`;
  lastIdByReplica[replica] = newId;
  return newId;
}


function byOrigin(e1, e2) {
  if (e1.originEventId > e2.originEventId) {
    return 1;
  }

  if (e1.originEventId < e2.originEventId) {
    return -1;
  }

  return 0;
}

function byLocalReverse(e1, e2) {
  if (e1.localEventId > e2.localEventId) {
    return -1;
  }

  if (e1.localEventId < e2.localEventId) {
    return 1;
  }

  return 0;
}

export default function DemoCrud({ header, }) {
  const [app1Events, setApp1Events] = useState([]);
  const [app2Events, setApp2Events] = useState([]);
  const [serverEvents, setServerEvents] = useState([]);

  async function updateApp1Value(v) {
    const eventId = genId('laptop');
    setApp1Events(app1Events.concat([{
      localEventId: eventId,
      originEventId: eventId,
      data: {
        value: v,
      }
    }]));
  }

  async function updateApp2Value(v) {
    const eventId = genId('phone');
    setApp2Events(app2Events.concat([{
      localEventId: eventId,
      originEventId: eventId,
      data: {
        value: v,
      }
    }]));
  }

  function syncApp1() {
    sync({
      from: app1Events,
      to: serverEvents,
      setFrom: setApp1Events,
      setTo: setServerEvents,
      fromReplica: 'laptop',
      toReplica: 'server',
    });
  }

  function syncApp2() {
    sync({
      from: app2Events,
      to: serverEvents,
      setFrom: setApp2Events,
      setTo: setServerEvents,
      fromReplica: 'phone',
      toReplica: 'server',
    });
  }

  function reset() {
    setApp1Events([]);
    setApp2Events([]);
    setServerEvents([]);
  }

  const app1State = [...app1Events]
    .reduce(reducer, defaultState);

  const app2State = [...app2Events]
    .reduce(reducer, defaultState);

  const serverState = [...serverEvents]
    .reduce(reducer, defaultState);

  const app1Value = app1State.value;
  const app2Value = app2State.value;
  const serverValue = serverState.value;

  const sortedApp1 = [...app1Events].sort(byLocalReverse);
  const sortedApp2 = [...app2Events].sort(byLocalReverse);
  const sortedServer = [...serverEvents].sort(byLocalReverse);

  return (
    <div style={styles.block}>
      <div style={styles.row_header}>
        <h4 style={styles.h4}>
          {header}
        </h4>
      </div>
      <div style={styles.pipeline}>
        <div style={styles.process}>
          <label>{`User's laptop`}</label>
          <div>
            <Btn selected={app1Value} value={1} update={updateApp1Value} />
            <Btn selected={app1Value} value={2} update={updateApp1Value} />
            <Btn selected={app1Value} value={3} update={updateApp1Value} />
          </div>
          <div>
            <button onClick={syncApp1} style={styles.button}>
              Sync with server
            </button>
          </div>
          <ConflictInfo {...app1State} />
        </div>
        <div style={styles.process}>
          <label>{`Server`}</label>
          <h4 style={styles.h4}>{serverValue}</h4>
          <ConflictInfo {...serverState} />
        </div>
        <div style={styles.process}>
          <label htmlFor='app2Value'>{`User's smartphone`}</label>
          <div>
            <Btn selected={app2Value} value={1} update={updateApp2Value} />
            <Btn selected={app2Value} value={2} update={updateApp2Value} />
            <Btn selected={app2Value} value={3} update={updateApp2Value} />
          </div>
          <div>
            <button onClick={syncApp2} style={styles.button}>
              Sync with server
            </button>
          </div>
          <ConflictInfo {...app2State} />
        </div>
      </div>
      <div style={styles.row_log}>
          <ul style={styles.ul}>
            {sortedApp1.map(e => <Event {...e} />)}
          </ul>
          <ul style={styles.ul}>
            {sortedServer.map(e => <Event {...e} />)}
          </ul>
        <ul style={styles.ul}>
          {sortedApp2.map(e => <Event {...e} />)}
        </ul>
      </div>
      <div style={styles.row}>
        <button style={styles.button} onClick={reset}>Reset all</button>
      </div>
    </div>
  );
}


function ConflictInfo({ hasConflict, conflictingValues }) {
  let text = '';

  if (hasConflict) {
    text = `Has conflict: ${conflictingValues.join(' vs ')}`;
  }

  return (
    <div style={{minHeight: '1em', color: 'tomato'}}>{text}</div>
  );
}


function Event({ localEventId, originEventId, data }) {
  const pStyle = { margin: 0, marginTop: 4 };
  const liStyle = {
    fontSize: '0.82em',
    listStyle: 'none',
    borderBottom: '1px solid #050505',
    marginBottom: 8,
    marginLeft: 8,
  }
  return (
    <li style={liStyle}>
      <p style={pStyle}>
        <b>{`value: `}{`${data.value}`}</b>
      </p>
      <p style={pStyle}>
        {`localEventId: `}<i>{`${localEventId}`}</i>
      </p>
      <p style={pStyle}>
        {`originEventId: `}<i>{`${originEventId}`}</i>
      </p>
    </li>
  );
}


function Btn({ selected, value, update }) {
  const disabled = selected === value;
  return (
    <button
      style={styles.button}
      disabled={disabled}
      onClick={() => update(value)}
    >
      {value}
    </button>
  );
}

function getReplicaName(eventId) {
  return eventId.split('@').slice(-1)[0];
}

