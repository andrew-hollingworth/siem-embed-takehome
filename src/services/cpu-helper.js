import os from 'node:os';


export const avg = () => {
    let cpus = os.cpus().length
    let value = os.loadavg()[0]/cpus
    return value
}

export let number = avg()
