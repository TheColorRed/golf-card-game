class PlayerCtrl extends Component {

    public deck: CardDeck;
    public selectedCard: Card;

    public masterDeck: CardDeck;
    public discardDeck: CardDeck;

    private selectedPile: CardDeck;

    start() {
        this.masterDeck = GameObject.getByName('MasterDeck').getComponent(CardDeck);
        this.discardDeck = GameObject.getByName('DiscardDeck').getComponent(CardDeck);
    }

    update() {
        let mousePressed = Input.mousePressed(Mouse.LEFT);
        let m = Input.mousePosition;

        // Get card from deck or discard pile
        if (mousePressed && !this.selectedCard) {
            let card = this.masterDeck.cards[0];
            if (card) {
                let origin = card.getComponent(SpriteRenderer).sprite.getOrigin();
                if (this.mouseOverCard(m, card.transform, origin)) {
                    this.selectedCard = card;
                    this.selectedPile = this.masterDeck;
                }
            }
            if (!this.selectedCard) {
                let card = this.discardDeck.cards[0];
                if (card) {
                    let origin = card.getComponent(SpriteRenderer).sprite.getOrigin();
                    if (this.mouseOverCard(m, card.transform, origin)) {
                        this.selectedCard = card;
                        this.selectedPile = this.discardDeck;
                    }
                }
            }
            if (this.selectedCard) {
                this.selectedCard.isSelected = true;
            }
        }

        if (Input.mouseDown(Mouse.LEFT) && this.selectedCard) {
            this.selectedCard.transform.position = m;
            let cardOver = this.mouseOverCard(m, this.deck.transform);
            if (cardOver) {
                this.selectedCard.setFaceUp();
            }
        }

        if (Input.mouseReleased(Mouse.LEFT) && this.selectedCard) {
            let replaced: boolean = false;
            let trans = this.mouseOverCard(m, this.deck.transform);
            if (trans) {
                let myCard = trans.getComponent(Card);
                let pos = myCard.transform.position;
                this.deck.removeCard(myCard);
                this.discardDeck.addTopCard(myCard);

                let deckCard = this.selectedPile.removeCard(this.selectedCard);
                this.deck.addTopCard(deckCard);

                deckCard.setFaceUp();
                myCard.setFaceUp();

                this.selectedCard.transform.position = pos;
                myCard.transform.position = this.discardDeck.transform.position;

                deckCard.transform.parent = this.deck.transform;
                myCard.transform.parent = this.discardDeck.transform;

                replaced = true;
            }
            if (!replaced) {
                if (this.selectedCard.isFaceUp) {
                    this.selectedPile.removeCard(this.selectedCard);
                    this.discardDeck.addTopCard(this.selectedCard);
                    this.selectedCard.transform.position = this.discardDeck.transform.position;
                } else {
                    this.selectedCard.transform.position = this.selectedPile.transform.position;
                }
            }
            this.selectedCard.isSelected = false;
            this.selectedCard = null;
            this.selectedPile = null;
        }

        if (mousePressed) {
            if (this.deck.visibleCards == 0) {
                let trans = this.mouseOverCard(m, this.deck.transform);
                if (trans) {
                    trans.getComponent(Card).setFaceUp();
                }
            }
        }
    }

    private mouseOverCard(mousePosition: Vector2, transform: Transform, origin?: Vector2): Transform {
        if (transform.length > 0) {
            for (let trans of transform) {
                let origin = trans.getComponent(SpriteRenderer).sprite.getOrigin();
                let p = trans.position;
                if (
                    mousePosition.x > p.x - origin.x &&
                    mousePosition.x < p.x + origin.x &&
                    mousePosition.y > p.y - origin.y &&
                    mousePosition.y < p.y + origin.y
                ) {
                    return trans;
                }
            }
        } else {
            let p = transform.position;
            if (
                mousePosition.x > p.x - origin.x &&
                mousePosition.x < p.x + origin.x &&
                mousePosition.y > p.y - origin.y &&
                mousePosition.y < p.y + origin.y
            ) {
                return transform;
            }
        }
        return null;
    }

}