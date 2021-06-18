# Interface: DiagnosticUpdater

[Backend/Interfaces/DiagnosticUpdater](../modules/backend_interfaces_diagnosticupdater.md).DiagnosticUpdater

Various parts of our codebase need to be able to self-report diagnostics. To enable them to do
so, you must provide them with an object that conforms to this interface. Currently, the only
implementation of this function is `GameManager`. However, in the future, we might want to stream
a sample of these diagnostic updates to our backend, so that we can analyze performance, catch
bugs, etc.

## Table of contents

### Properties

- [updateDiagnostics](backend_interfaces_diagnosticupdater.diagnosticupdater.md#updatediagnostics)

## Properties

### updateDiagnostics

• **updateDiagnostics**: (`updateFn`: (`d`: [_Diagnostics_](frontend_panes_diagnosticspane.diagnostics.md)) => _void_) => _void_

Updates the diagnostics using the provided updater function.

#### Type declaration

▸ (`updateFn`: (`d`: [_Diagnostics_](frontend_panes_diagnosticspane.diagnostics.md)) => _void_): _void_

#### Parameters

| Name       | Type                                                                            |
| :--------- | :------------------------------------------------------------------------------ |
| `updateFn` | (`d`: [_Diagnostics_](frontend_panes_diagnosticspane.diagnostics.md)) => _void_ |

**Returns:** _void_
