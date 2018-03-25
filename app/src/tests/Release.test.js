// About the content of the exported file (final tranlation)
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


it('has all current fields from source', () => {
  const fakeHeadSource = {
    test_1: {
      message: "Hello",
    },
    test_2: {
      message: "Hi",
      description: "For friends only"
    }
  };

  const fakeBaseTarget = {
    test_1: {
      message: "Bonjour",
    },
    test_2: {
      message: "Salut",
      description: "For friends only"
    }
  };

  app.handleSetLanguageFile("headSourceLanguage", "", fakeHeadSource);
  app.handleSetLanguageFile("baseTargetLanguage", "", fakeBaseTarget);

  const translation = app.getFullTranslation();
  expect(Object.keys(translation)).toEqual(Object.keys(fakeHeadSource));
  Object.values(translation).forEach((field) => {
    expect(field.hasOwnProperty('message')).toBe(true);
  });
});

it('keeps previous value from source target if unchanged', () => {
  const fakeHeadSource = {
    test_1: {
      message: "Hello",
    },
    test_2: {
      message: "Hi",
      description: "For friends only"
    }
  };

  const fakeBaseTarget = {
    test_1: {
      message: "Bonjour",
    },
    test_2: {
      message: "Salut",
      description: "For friends only"
    }
  };

  app.handleSetLanguageFile("headSourceLanguage", "", fakeHeadSource);
  app.handleSetLanguageFile("baseTargetLanguage", "", fakeBaseTarget);

  const translation = app.getFullTranslation();

  Object.keys(translation).forEach((id) => {
    expect(translation[id].message).toEqual(fakeBaseTarget[id].message);
  });
});

it('takes modification in account', () => {
  const fakeHeadSource = {
    test_1: {
      message: "Hello",
    },
    test_2: {
      message: "Hi",
      description: "For friends only"
    }
  };

  const fakeBaseTarget = {
    test_1: {
      message: "Bonjour",
    },
    test_2: {
      message: "Salut",
      description: "For friends only"
    }
  };
  const modification = "Hey";

  app.handleSetLanguageFile("headSourceLanguage", "", fakeHeadSource);
  app.handleSetLanguageFile("baseTargetLanguage", "", fakeBaseTarget);

  app.updateTranslation("test_2", modification);

  const translation = app.getFullTranslation();

  expect(translation["test_1"].message)
    .toEqual(fakeBaseTarget["test_1"].message);
  expect(translation["test_2"].message)
    .toEqual(modification);
});

it("doesn't export empty field", () => {
  const fakeHeadSource = {
    test_1: {
      message: "Hello",
    },
    test_2: {
      message: "Hi",
      description: "For friends only"
    }
  };

  const fakeBaseTarget = {
    test_1: {
      message: "",
    },
    test_2: {
      message: "",
      description: "For friends only"
    }
  };
  const modification = "Hey";

  app.handleSetLanguageFile("headSourceLanguage", "", fakeHeadSource);
  app.handleSetLanguageFile("baseTargetLanguage", "", fakeBaseTarget);

  app.updateTranslation("test_2", modification);

  const translation = app.getFullTranslation();

  expect(translation.hasOwnProperty("test_1")).toBe(false);
  expect(translation["test_2"].message)
    .toEqual(modification);
});

it("exports with ids in the same order as in the original.", () => {
  const fakeHeadSource = {
    A: {
      message: "Hello",
    },
    C: {
      message: "Hi",
    },
    B: {
      message: "Hi",
    },
  };

  app.handleSetLanguageFile("headSourceLanguage", "", fakeHeadSource);
  app.handleSetLanguageFile("baseTargetLanguage", "", fakeHeadSource);

  const translation = app.getFullTranslation();

  expect(Object.keys(JSON.parse(JSON.stringify(translation))))
    .toEqual(Object.keys(fakeHeadSource));
});

it("exports placeholders as well", () => {
  const subOject = {
    folder : {
      content: "$1",
      example: "backup/"
    }
  }
  const fakeHeadSource = {
    test_2: {
      message: "Done in the subfolder '$FOLDER$'.",
      description: "",
      placeholders: subOject
    }
  };
  const modification = "Dans le sous-dossier '$FOLDER$'.";
  app.handleSetLanguageFile("headSourceLanguage", "", fakeHeadSource);

  app.updateTranslation("test_2", modification);
  const translation = app.getFullTranslation();

  expect(translation.hasOwnProperty("test_2")).toBe(true);
  expect(translation.test_2.message).toEqual(modification);
  expect(translation.test_2.hasOwnProperty("placeholders")).toBe(true);
  expect(translation.test_2.placeholders).toEqual(subOject);
});

it("exports placeholders as well", () => {
  const subOject = {
    folder : {
      content: "$1",
      example: "backup/"
    }
  }
  const fakeHeadSource = {
    test_2: {
      message: "Done in the subfolder '$FOLDER$'.",
      description: "",
      placeholders: subOject
    }
  };
  const modification = "Dans le sous-dossier '$FOLDER$'.";
  app.handleSetLanguageFile("headSourceLanguage", "", fakeHeadSource);

  app.updateTranslation("test_2", modification);
  const translation = app.getFullTranslation();

  expect(translation.hasOwnProperty("test_2")).toBe(true);
  expect(translation.test_2.message).toEqual(modification);
  expect(translation.test_2.hasOwnProperty("placeholders")).toBe(true);
  expect(translation.test_2.placeholders).toEqual(subOject);
});
