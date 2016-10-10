class MainCardDeck extends Prefab {

    public init(): GameObject {
        let go = new GameObject('MasterDeck');

        let cd = go.addComponent(CardDeck);
        cd.ownerId = 100;

        return go;
    }

}