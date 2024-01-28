function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cards: [{ front: "", front1: "", back: "", back1: "" }],
      filters: '',
    };

    this.reload("");
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "App" }, /*#__PURE__*/
        React.createElement(Flashcards, {
          cards: this.state.cards,
          handleReload: this.reload,
        })));
  }

  async reload(filters) {
    const datas = await ModelsData.getDatasVocabulary(filters);
    this.setState({ cards: datas });
  }
}

class ModelsData {
  static async getDatasVocabulary(filter) {
    const datas = [];
    const data = this.fetchCsv();
    await data.then(async result => {
      if (result !== '') {
        var values = result.split('\r\n');

        for (let index = 0; index < values.length; index++) {
          const element = values[index];
          const value = element.split('|');

          if (value[0] !== '' && value[2] !== '' && value[3] !== ''
            && value[0] && value[2] && value[3]) {

            const inputFilter = value[3].split('|');

            var isAdd = false;

            for (let index = 0; index < inputFilter.length; index++) {
              const element1 = inputFilter[index];

              if (filter === "" || filter.includes(element1)) {
                isAdd = true;
              }
            }

            if (isAdd) {
              await datas.push({ front: value[0], front1: value[1], back: value[2], back1: value[3] });
            }
          }
        }
      }
    });

    return datas;
  }

  static fetchCsv() {
    return fetch('data/vocabulary.csv').then(function (response) {
      let reader = response.body.getReader();
      let decoder = new TextDecoder('utf-8');

      return reader.read().then(function (result) {
        return decoder.decode(result.value);
      });
    });
  }
}

class Flashcards extends React.Component {
  constructor(props) {
    super(props); _defineProperty(this, "arrowHandler", left => {
      const { cardIndex } = this.state;
      if (left) {
        if (cardIndex - 1 >= 0) {
          this.setState({ cardIndex: cardIndex - 1 });
        }
      } else {
        if (cardIndex + 1 < this.props.cards.length) {
          this.setState({ cardIndex: cardIndex + 1 });
        }
      }
    }); this.state = { cardIndex: 0 };
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "flashcard-viewer noselect" }, /*#__PURE__*/
        React.createElement("div", { className: "flashcard-item-wrapper" }, /*#__PURE__*/
          React.createElement(FlashcardItem, {
            cardIndex: this.state.cardIndex,
            card: this.props.cards[this.state.cardIndex]
          })), /*#__PURE__*/

        React.createElement("div", null, /*#__PURE__*/
          React.createElement(FilterInput, {
            arrowHandler: this.arrowHandler,
            cards: this.props.cards,
            filters: this.props.filters,
          }),
          React.createElement(FilterButton, {
            arrowHandler: this.arrowHandler,
            cards: this.props.cards,
            filters: this.props.filters,
            handleReload: this.props.handleReload,
          }),
        ),

        React.createElement("div", null, /*#__PURE__*/
          React.createElement(NavButtons, {
            arrowHandler: this.arrowHandler,
            cardIndex: this.state.cardIndex,
            cardLength: this.props.cards.length
          })),
      ));
  }
}

class FilterButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      React.createElement('button', {
        className: 'postfix',
        onClick: () => this.clickFilter(),
      }, 'Filter')
    );
  }

  async clickFilter() {
    const filterInput = document.getElementById("filterInput");
    console.log("Button Filter");
    this.props.handleReload(filterInput.value);
  };
}

class FilterInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const inputData = React.createElement('input', {
      type: 'text',
      id: 'filterInput',
    });

    return (
      inputData
    );
  }
}

class FlashcardItem extends React.Component {
  constructor(props) {
    super(props); _defineProperty(this, "clickHandler", () => {
      this.setState({
        flipped: !this.state.flipped,
        flipStyle: { transition: 'transform 0.5s' }
      });

    }); this.state = { flipped: false, flipStyle: { transition: 'transform 0.5s' } };
  } componentDidUpdate(prevProps) { if (prevProps.cardIndex !== this.props.cardIndex) { this.setState({ flipped: false, flipStyle: {} }); } }
  render() {
    const rotation = this.state.flipped ? 180 : 0;
    const frontStyle = { ...this.state.flipStyle, transform: `rotateY(${rotation}deg)` };
    const backStyle = { ...this.state.flipStyle, transform: `rotateY(${180 + rotation}deg)` };

    const flashcard1 = React.createElement("div", { className: "flashcard-item-inner", style: frontStyle }, /*#__PURE__*/
      React.createElement("div", { className: "flashcard-item-helper" }, this.props.card.front1), //front
      React.createElement("div", { className: "" }, this.props.card.front),
    );

    const flashcard2 = React.createElement("div", { className: "flashcard-item-inner", style: backStyle }, /*#__PURE__*/
      React.createElement("div", { className: "flashcard-item-helper" }, this.props.card.back1), // back
      this.props.card.back);

    return /*#__PURE__*/(
      React.createElement("div", { className: "flashcard-item", onClick: () => this.clickHandler() }, /*#__PURE__*/
        flashcard1,
        flashcard2,
      )
    );
  }
}

NavButtons = props => {
  const leftStyle = props.cardIndex - 1 < 0 ? { opacity: 0.5 } : {};
  const rightStyle = props.cardIndex + 1 >= props.cardLength ? { opacity: 0.5 } : {};
  return /*#__PURE__*/(
    React.createElement("div", { className: "nav-buttons-wrapper" }, /*#__PURE__*/
      React.createElement("div", { className: "nav-arrow-btn", style: leftStyle, onClick: () => props.arrowHandler(true) }, "\u2190"),
      `${props.cardIndex + 1}/${props.cardLength}`, /*#__PURE__*/
      React.createElement("div", { className: "nav-arrow-btn", style: rightStyle, onClick: () => props.arrowHandler(false) }, "\u2192")));
};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));