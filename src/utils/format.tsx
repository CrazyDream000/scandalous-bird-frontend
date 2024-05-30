export const formatTime = (duration:number) => {
    const hour = duration / 3600;
    const minute = (duration % 3600) / 60;
    const second = duration % 60;
    return duration>0?Math.trunc(hour).toString().padStart(2, '0') + ":" + Math.trunc(minute).toString().padStart(2, '0') + ":" + second.toString().padStart(2, '0'):"00:00:00"
}