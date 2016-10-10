class GameCard extends Prefab {

    public init(): GameObject{
        let go = new GameObject;
        let sprite = Assets.getSprite('cards');
        sprite.subImages(72, 100, 65, 5);
        sprite.animated = false;

        let spr = go.addComponent(SpriteRenderer);
        spr.sprite = sprite;
        spr.frame = 13 * 4 + 5;

        // go.addComponent(PlayerCtrl);

        return go;
    }

}