# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
### Added

### Changed

## [2.1.1] - 2017-07-23
- Updated all depenendencies to newest except for `eslint`, `eslint-plugin-jsx-a11y` and `react-router`.
- Fixed example-regression after [#228](https://github.com/nutgaard/react-router-breadcrumbs/pull/228)
- Added `run.bat` (using `npx`) for easier setup on windows 

## [2.1.0] - 2017-05-02
### Changed
- [#254](https://github.com/nutgaard/react-router-breadcrumbs/pull/254) Fixes new deprecation warnings introduced by React 15.5 ([@JMontagu](https://github.com/JMontagu))

## [2.0.0] - 2017-01-10
### Changed
- [#228](https://github.com/nutgaard/react-router-breadcrumbs/pull/228) Support optional parameters ([@will14smith](https://github.com/will14smith))
  Switched to react-routes `formatPattern` for link-formatting.
  If you are using `params` make sure to provide it to the component. This would previously fail silently, while now it will throw an error.

## [1.3.0] - 2017-01-10
### Changed
- [#227](https://github.com/nutgaard/react-router-breadcrumbs/pull/227) [#210](https://github.com/nutgaard/react-router-breadcrumbs/issues/210) Bugfix, fixed simple issue where you could end up with multiple slashes in url

[Unreleased]: https://github.com/nutgaard/react-router-breadcrumbs/compare/v2.1.1...HEAD
[2.1.1]: https://github.com/nutgaard/react-router-breadcrumbs/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/nutgaard/react-router-breadcrumbs/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/nutgaard/react-router-breadcrumbs/compare/v1.3.0...v2.0.0
[1.3.0]: https://github.com/nutgaard/react-router-breadcrumbs/compare/v1.2.0...v1.3.0
