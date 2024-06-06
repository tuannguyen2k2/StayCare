export function filterFalsyValues<T>(obj: Partial<T>): Partial<T> {
        return Object.fromEntries(
            Object.entries(obj).filter(([, value]) => Boolean(value))
        ) as Partial<T>;
}
