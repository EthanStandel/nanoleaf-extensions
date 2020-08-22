export interface ApiEffects {

    effectsList?: ApiEffects.List;
    select?: ApiEffects.Select;

}

export namespace ApiEffects {

    export type List = Array<string>;

    export type Select = string;

}
