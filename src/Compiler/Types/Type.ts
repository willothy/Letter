
export default class LetterType {
    name: string;

    create?: Function;
    add?: Function;
    sub?: Function;
    mul?: Function;
    div?: Function;

    constructor(name, create: Function, {
        add,
        sub,
        mul,
        div
    }: {
        add?: Function,
        sub?: Function,
        mul?: Function,
        div?: Function,
    } = {}) {
        this.name = name;

        this.create = create;
        this.add = add;
        this.sub = sub;
        this.mul = mul;
        this.div = div;
    }
}