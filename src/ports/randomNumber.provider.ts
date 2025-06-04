export abstract class RandomNumberProvider {
    abstract generate(between: [number, number]): number;
}