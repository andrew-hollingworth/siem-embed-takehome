import React from 'react';
import os from 'node:os';

const Cpu = () => {
  console.dir(os.cpus, { depth: null })
  let cpus1 = os.cpus().length
  let avg = os.loadavg()[0]/cpus1
  let load = os.loadavg()
  console.log("load"+load)
    return (<div>hi</div>)
}

export default Cpu