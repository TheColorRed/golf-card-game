Engine.setup('#game', () => {
    Stage.fillParent();
    Engine.assets({
        sprites: [
            {
                name: 'cards',
                source: 'img/cards.gif'
            }
        ]
    });
});

Engine.run(() => {
    // Main deck
    let deck = instantiate(MainCardDeck, Stage.center.minus(55, 0));
    // Discard deck
    let discard = instantiate(DiscardCardDeck, Stage.center.plus(55, 0));
    discard.transform.position;

    // Plyaer decks
    let p0 = instantiate(PlayerCardDeck, Stage.leftMiddle.plus(100, 0));
    let p1 = instantiate(PlayerCardDeck, Stage.topCenter.plus(0, 120));
    let p2 = instantiate(PlayerCardDeck, Stage.rightMiddle.minus(100, 0));
    let p3 = instantiate(PlayerCardDeck, Stage.bottomCenter.minus(0, 120))
    let pCtrl = p3.addComponent(PlayerCtrl);
    pCtrl.deck = p3.getComponent(CardDeck);

    // Add the decks to the controller
    let gameCtrl = new GameController;
    gameCtrl.deck = deck.getComponent(CardDeck);
    gameCtrl.discard = discard.getComponent(CardDeck);
    gameCtrl.players.push(p0.getComponent(CardDeck).setDrawDepth(1000));
    gameCtrl.players.push(p1.getComponent(CardDeck).setDrawDepth(2000));
    gameCtrl.players.push(p2.getComponent(CardDeck).setDrawDepth(3000));
    gameCtrl.players.push(p3.getComponent(CardDeck).setDrawDepth(4000));

    gameCtrl.initRound();

});

// Debug.enabled = true;