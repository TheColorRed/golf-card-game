class CardDeck extends Component {

    public cards: Card[] = [];
    public ownerId: number;

    public get visiblePoints(): number {
        let points = 0;
        this.cards.forEach(card => {
            if (card.isFaceUp) {
                points += card.points;
            }
        });
        return points;
    }

    public get visibleCards(): number {
        let cards = 0;
        this.cards.forEach(card => {
            if (card.isFaceUp) {
                cards++;
            }
        });
        return cards;
    }

    public depth(card: Card): number {
        for (let i in this.cards) {
            if (this.cards[i] == card) {
                return parseInt(i);
            }
        }
        return 0;
    }

    public setDrawDepth(ownerId: number): CardDeck {
        this.ownerId = ownerId;
        return this;
    }

    public removeCard(card: Card): Card {
        let idx = this.cards.indexOf(card);
        let cards = this.cards.splice(idx, 1);
        return cards[0] || null;
    }

    public addBottomCard(card: Card) {
        this.cards.push(card);
        card.deck = this;
    }

    public addTopCard(card: Card) {
        this.cards.unshift(card);
        card.deck = this;
    }

    public takeTopCard(): Card {
        let cards = this.cards.splice(0, 1);
        return cards[0] || null;
    }

    public takeBottomCard(): Card {
        let idx = this.cards.length - 1;
        let cards = this.cards.splice(idx, 1);
        return cards[0] || null;
    }

}