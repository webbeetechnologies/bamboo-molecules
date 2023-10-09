export default function isInteger(value: number): boolean {
    return isFinite(value) && Math.floor(value) === value;
}
