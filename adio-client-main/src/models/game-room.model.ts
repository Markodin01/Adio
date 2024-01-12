export class GameRoom {
    constructor(
        public id: number,
        public name: string,
        public playlist_id: number,
        public game_type: string,
        public clients: Set<any>,
        public current_round: any,
        public settings: any
    ) {}
}