import i18next, {
  i18n as I18n,
  InitOptions as I18nInitOptions,
  TFunction as I18nTFunction,
} from "i18next";

function i18nCreateInstance(
  options: I18nInitOptions
): [I18n, Promise<I18nTFunction>] {
  const _i18next = i18next.createInstance();

  return [_i18next, _i18next.init(options)];
}

type T18nInitOptionsWithoutInitImmediate = Omit<
  I18nInitOptions,
  "initImmediate"
>;

export function i18nCreateInstanceSync(
  options: T18nInitOptionsWithoutInitImmediate
): I18n {
  const initOptions: I18nInitOptions = { ...options, initImmediate: false };
  const [_i18next] = i18nCreateInstance(initOptions);

  return _i18next;
}

export function i18nCreateInstanceAsync(
  options: T18nInitOptionsWithoutInitImmediate
): Promise<I18n> {
  const initOptions: I18nInitOptions = { ...options, initImmediate: true };
  const [_i18next, _i18nextPromise] = i18nCreateInstance(initOptions);

  return _i18nextPromise.then(() => _i18next);
}
