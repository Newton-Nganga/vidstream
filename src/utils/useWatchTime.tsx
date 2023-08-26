
export function useWatchTime(runtime: number): string {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    return `${hours}H ${minutes}Min`;
}