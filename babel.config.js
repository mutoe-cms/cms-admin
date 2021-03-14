// Copyright (c) 2014-present, Facebook, Inc. All rights reserved.

const convertImportMetaEnv = () => ({
  visitor: {
    MetaProperty (path) {
      path.replaceWithSourceString('process')
    },
  },
})

module.exports = (api) => {
  const isTest = api.env('test')

  return {
    presets: [
      ['@babel/preset-env', isTest
        ? {
            useBuiltIns: 'entry',
            corejs: '2',
            targets: { node: 'current' },
          }
        : { modules: false }],
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-transform-runtime',
      isTest && convertImportMetaEnv,
    ],
  }
}
