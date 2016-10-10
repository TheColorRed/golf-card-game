class Card extends Component {

    // 0 - 12
    public value: number;
    // 0 = hearts
    // 1 = diamonds
    // 2 = clubs
    // 3 = spades
    public suit: number;
    public points: number = 10;

    private spriteIndex: number;
    private isFacedown: boolean = true;
    public deck: CardDeck;

    private spr: SpriteRenderer;
    public isSelected: boolean = false;

    start() {
        this.spr = this.getComponent(SpriteRenderer);
    }

    update() {
        if (this.isSelected) {
            this.spr.depth = 0;
        } else {
            this.spr.depth = (this.deck.depth(this) + this.deck.ownerId) + 1000;
        }
    }

    public get isFaceUp(): boolean {
        return !this.isFacedown;
    }

    public get index(): number {
        if (this.isFacedown) {
            return 4 * 13 + 5;
        } else {
            return this.spriteIndex;
        }
    }

    public init(value: number, suit: number, sprIdx: number) {
        this.value = value;
        this.suit = suit;
        this.spriteIndex = sprIdx;
        // J/Q = 10 points otherwise face value
        this.points = value > 9 ? 10 : value + 1;
        // K = 0 points otherwise use previous value
        this.points = value == 12 ? 0 : this.points;
    }

    public setFaceUp() {
        this.isFacedown = false;
        this.getComponent(SpriteRenderer).frame = this.index;
    }

}