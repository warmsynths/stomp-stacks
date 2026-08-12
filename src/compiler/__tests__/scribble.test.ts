import { describe, it, expect } from 'vitest';
import Ajv from 'ajv';
import { compileHardwareScribbleConfig } from '../adapters/scribble.js';
import { scribbleJsonSchema } from '../../types/scribble.js';
import { StompStore } from '../../state/store.js';

describe('Scribble Schema Validation', () => {
  it('generates a completely valid Pirate MIDI Scribble JSON file', () => {
    const store = new StompStore();
    // Set up a mock rig
    store.addPedal('blooper');
    store.addPedal('mood');
    store.applyMacroTemplate('blooper-left-cycle');

    const config = compileHardwareScribbleConfig(store.state);

    const ajv = new Ajv({ allErrors: true, strict: false });
    const validate = ajv.compile(scribbleJsonSchema);
    
    const valid = validate(config);
    if (!valid) {
      console.error('AJV Validation Errors:', JSON.stringify(validate.errors, null, 2));
    }
    expect(valid).toBe(true);
  });
});
