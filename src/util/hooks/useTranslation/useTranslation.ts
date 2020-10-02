import { get } from 'lodash-es';
import { useCallback, useMemo, useRef } from 'react';
import dictionaries from './dictionaries.json';
import { Dictionaries, Translate, UseTranslation } from './models';

const LANG = 'en';

const DEFAULT_NAMESPACE = 'common';

function parseInput(input: string, fallbackNamespace: string): string[] {
  let [namespace, key] = input.split(':');

  if (!key) {
    key = namespace;
    namespace = fallbackNamespace;
  }

  return [namespace, key];
}

export default function (namespaces: string | string[] = [DEFAULT_NAMESPACE]): UseTranslation {
  const namespacesArray = useRef(Array.isArray(namespaces) ? namespaces : [namespaces]);

  const requestedNamespaces = useMemo(() => {
    const dictionary = dictionaries[LANG as keyof typeof dictionaries];

    if (!namespacesArray.current.some(namespace => namespace === DEFAULT_NAMESPACE)) {
      namespacesArray.current.push(DEFAULT_NAMESPACE);
    }

    return namespacesArray.current.reduce<Dictionaries>((accNamespaces, namespace) => {
      if (!Object.prototype.hasOwnProperty.call(dictionaries[LANG], namespace)) {
        throw new Error(`Unknown namespace in dictionaries: ${namespace}`);
      }

      return {
        ...accNamespaces,
        [namespace]: dictionary[namespace as keyof typeof dictionary],
      };
    }, {});
  }, []);

  const t: Translate = useCallback(
    (input, mappings) => {
      const [namespace, key] = parseInput(input, namespacesArray.current[0]);

      const translation = get(requestedNamespaces[namespace], key);

      if (!translation) {
        return key;
      }

      return mappings
        ? translation.replace(/\{\{(\w+)\}\}/gm, (match, mapping) => mappings[mapping] || mapping)
        : translation;
    },
    [requestedNamespaces]
  );

  return { t };
}
