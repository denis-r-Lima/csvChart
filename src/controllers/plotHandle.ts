export function clickHandle(e: any){

    let obj: any = e.activePayload[0].payload
    obj.xCord = e.activeTooltipIndex
    obj.x = e.chartX
    return obj
}




const plotHandle = {clickHandle}

export default plotHandle