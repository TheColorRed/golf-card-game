class GameController {

    public deck: CardDeck;
    public discard: CardDeck;

    public players: CardDeck[] = [];

    public playerTurn: number = 3;

    public initRound() {
        this.createDeck();
        this.shuffleDeck(this.deck.cards);
        this.dealCards();
        this.flipFirst();
    }

    public createDeck() {
        let c = 0;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 13; j++) {
                let card = instantiate(GameCard);
                let cardComp = card.addComponent(Card);
                cardComp.init(j, i, c);
                this.deck.addBottomCard(cardComp);
                c++;
            }
        }
    }

    public shuffleDeck(deck: Card[]) {
        let currentIndex = deck.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = deck[currentIndex];
            deck[currentIndex] = deck[randomIndex];
            deck[randomIndex] = temporaryValue;
        }

        return deck;
    }

    public dealCards() {
        let dealCount = 0;
        for (let i = 0; i < 4 * 4; i++) {
            // i = card number
            let card = this.deck.takeTopCard();
            let player = i % 4;
            let playerLoc = this.players[player].transform.position;
            let cardPos = Vector2.zero;
            switch (dealCount) {
                case 0:
                    cardPos = new Vector2(playerLoc.x - 41, playerLoc.y - 55);
                    break;
                case 1:
                    cardPos = new Vector2(playerLoc.x + 41, playerLoc.y - 55);
                    break;
                case 2:
                    cardPos = new Vector2(playerLoc.x - 41, playerLoc.y + 55);
                    break;
                case 3:
                    cardPos = new Vector2(playerLoc.x + 41, playerLoc.y + 55);
                    break;
            }

            card.transform.position = cardPos;
            card.transform.parent = this.players[player].transform;

            this.players[player].addTopCard(card);

            if (player == 3) {
                dealCount++;
            }
        }
        this.prepPlayerText();
        this.deck.cards.forEach(card => {
            card.transform.position = this.deck.transform.position;
            card.transform.parent = this.deck.transform;
        });

        let card = this.deck.takeTopCard();
        card.setFaceUp();
        this.discard.addTopCard(card);

        card.transform.position = this.discard.transform.position;
        card.transform.parent = this.discard.transform;
    }

    public flipFirst() {
        for (let i = 0; i < 3; i++) {
            let idx = Math.round(Random.range(0, 3));
            let card = this.players[i].cards[idx];
            card.setFaceUp();
        }
    }

    public prepPlayerText() {
        for (let i = 0; i < 4; i++) {
            let playerLoc = this.players[i].transform.position;

            let txt = new GameObject;

            let txtPos = Vector2.zero;
            switch (i) {
                case 0: txtPos = playerLoc.minus(0, 120); break;
                case 1: txtPos = playerLoc.plus(0, 120); break;
                case 2: txtPos = playerLoc.minus(0, 120); break;
                case 3: txtPos = playerLoc.minus(0, 120); break;
            }
            txt.transform.position = txtPos;

            let text = txt.addComponent(GUIText);
            let score = txt.addComponent(Score);
            score.gui = text;
            score.deck = this.players[i];
        }
    }

}