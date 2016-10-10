class Score extends Component {

    public gui: GUIText;
    public deck: CardDeck;

    start() {
        this.gui.horizontalAlign = HorizontalAlign.Center;
        this.gui.verticalAlign = VerticalAlign.Middle;
    }

    update() {
        this.gui.text = 'Score: ' + this.deck.visiblePoints.toString();
    }

}