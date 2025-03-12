
export const cpuAvg = (cpu, time) => {
    let length = time.length
    let avg 
    if (length < 3) {
        //No need to go any further, cpu can't have breached if we don't have two minute's data
        return
    } else {
        // Calculate the average over the last 2 minutes
        let sum = 0
        for (let i = length - 3; i <= length - 1; i++) {
            sum += cpu[i]
        }
        avg = sum / 3
    }
    return avg
}; 