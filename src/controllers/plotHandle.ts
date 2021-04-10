export function clickHandle(e: any){
    if(e){
        let obj: any = e.activePayload[0].payload
        obj.xCord = e.activeTooltipIndex
        obj.x = e.chartX
        return obj
    }   
}
