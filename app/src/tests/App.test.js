// App behavior
import LanguageFiles from '../LanguageFiles';
import Helpers from './helpers'

var app, el;

beforeEach(() => {
  window.sessionStorage = {};
  [app, el] = Helpers.instanciateApp();
});

afterEach(() => {
  Helpers.closeApp(el);
  window.sessionStorage = {};
});


it('renders without crashing', () => {
  let [app, el] = Helpers.instanciateApp();
  Helpers.closeApp(el);
});

it('add language file', () => {
  const source = "test";
  for (let id of LanguageFiles.ids) {
    app.handleSetLanguageFile(
      id,
      source,
      Helpers.fake_Language );

    expect(app.state[id].source).toEqual(
      source
    );
    expect(app.state[id].content).toEqual(
      Helpers.fake_Language
    );

    if ( id === "baseTargetLanguage") {
      expect(app.state.baseTargetLanguage.source).toEqual(
        source
      );
      expect(app.state.baseTargetLanguage.content).toEqual(
        Helpers.fake_Language
      );
    }
  }
});

it('doneLog is reset on call on handleSetLanguageFile', () => {
  const doneLog = "coucou"
  app.setState({
    doneLog
  });
  window.sessionStorage.doneLog = doneLog;

  expect(app.state.doneLog).toEqual(doneLog);
  expect(window.sessionStorage.doneLog).toEqual(doneLog);
  app.handleSetLanguageFile(
    "headTargetLanguage", "test", {}
  );
  expect(app.state.doneLog).toEqual({});
  expect(window.sessionStorage.doneLog).toEqual("{}");
});

it('add done value', () => {
  const first = "first", second = "second";
  const firstDone = {
    [first]: true,
  };
  const secondDone = Object.assign({}, firstDone, {
    [second]: false
  });

  // Add first one
  app.setDone(first, firstDone.first);
  expect(app.state.doneLog).toEqual(firstDone);
  expect(window.sessionStorage.doneLog).toEqual(
    JSON.stringify(firstDone)
  );

  // Add second one
  app.setDone(second, secondDone.second);
  expect(app.state.doneLog).toEqual(secondDone);
  expect(window.sessionStorage.doneLog).toEqual(
    JSON.stringify(secondDone)
  );

  // Change second one
  secondDone.second = false
  app.setDone(second, secondDone.second);
  expect(app.state.doneLog).toEqual(secondDone);
  expect(window.sessionStorage.doneLog).toEqual(
    JSON.stringify(secondDone)
  );
});

it('update well translatation', () => {
  const id = "test";
  // Add
  const addExpect = {
    [id]: {
      message: "Been added",
    }
  }
  app.updateTranslation(id, addExpect[id].message);
  expect(app.state.headTargetLanguage.content).toEqual(addExpect);
  expect(
    JSON.parse(window.sessionStorage.headTargetLanguage)
        .content)
  .toEqual(
    addExpect
  );


  // Modify
  const modifyExpect = {
    [id]: {
      message: "Been modified",
    }
  }
  app.updateTranslation(id, modifyExpect[id].message);
  expect(app.state.headTargetLanguage.content).toEqual(modifyExpect);
  expect(
    JSON.parse(window.sessionStorage.headTargetLanguage)
        .content)
  .toEqual(
    modifyExpect
  );

  // Remove
  const removeExpect = {}
  app.updateTranslation(id, "");
  expect(app.state.headTargetLanguage.content).toEqual(removeExpect);
  expect(
    JSON.parse(window.sessionStorage.headTargetLanguage)
        .content)
  .toEqual(
    removeExpect
  );
});
