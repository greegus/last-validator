# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.1] - 2022-04-26
### Fixed
- Fixed reference loop that caused eslint to fail :(

## [1.4.0] - 2022-04-26
### Added
- `setDefaultErrorMessages` method to set a default messages for built-in validators.
- Changelog :P.

## [1.3.2] - 2022-04-10
### Fixed
- Broken exports :(.

## [1.3.0] - 2022-04-10
### Changed
- Renamed `hasMinValue` validator to `isGreaterOrEqualThan`.
- Renamed `hasMaxValue` validator to `isLessOrEqualThan`.
- Renamed `isValidEmail` validator to `isEmail`.

### Added
- Added `isGreaterThan` validator.
- Added `isGreaterOrEqualThan` validator.
- Added `isLessThan` validator.
- Added `isLessOrEqualThan` validator.
- Added `hasMinLength` validator.
- Added `hasMinLength` validator.

## [1.2.0] - 2022-04-10
### Added
- `test` validator to make writing custom/inline validations easier.

### Changes
- Under the hood refactors.

## [1.1.0] - 2021-10-29
### Changes
- Bundled with Typescript.

## [1.0.0] - 2021-04-14
- Initial commit.
