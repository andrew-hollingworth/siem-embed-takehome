import React from 'react';
import os from 'node:os';


const Cpu = () => {
  let cpu = os.cpus()
  console.log(cpu)
}

export default Cpu