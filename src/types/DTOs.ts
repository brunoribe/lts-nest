export type CreatedLeadDTO = {
    leadId: number;
    cookie: string;
};

export type EventToScoreDTO = {
    leadId: number;
    eventType: string;
}

export type EventToScoreEndDTO = {
    leadId: number;
}

export type ScoreCalculatedDTO = {
    leadId: number;
    score: number;
}