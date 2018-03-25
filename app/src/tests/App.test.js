// App behavior
import LanguageFiles from '../LanguageFiles';
import Helpers from './helpers'

window.sessionStorage = {};
window.sessionStorage.removeItem = (el)=>{
  delete window.sessionStorage[el];
};

it('renders without crashing', () => {
  let [app, el] = Helpers.instanciateApp();
  Helpers.closeApp(el);
});

it('add language file', () => {
  let [app, el] = Helpers.instanciateApp();

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
  window.sessionStorage = {};
  Helpers.closeApp(el);
});

it('doneLog is reset on call on handleSetLanguageFile', () => {
  let [app, el] = Helpers.instanciateApp();

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

  window.sessionStorage = {};
  Helpers.closeApp(el);
});

it('add done value', () => {
  let [app, el] = Helpers.instanciateApp();

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

  window.sessionStorage = {};
  Helpers.closeApp(el);
});

it('update well translatation', () => {
  let [app, el] = Helpers.instanciateApp();

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

  window.sessionStorage = {};
  Helpers.closeApp(el);
});
