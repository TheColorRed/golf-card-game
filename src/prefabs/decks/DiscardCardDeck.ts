class DiscardCardDeck extends Prefab {

    public init(): GameObject {
        let go = new GameObject('DiscardDeck');

        let cd = go.addComponent(CardDeck);
        cd.ownerId = 200;

        return go;
    }

}