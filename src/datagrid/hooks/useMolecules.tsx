import { useMolecules as useMoleculesDefault } from '@bambooapp/bamboo-molecules';
import type * as components from '../components';

type Components = typeof components;

const useMolecules = () => useMoleculesDefault<Components>();

export default useMolecules;
