class PlayerCardDeck extends Prefab {

    public init(): GameObject {
        let go = new GameObject;

        go.addComponent(CardDeck);

        return go;
    }

}