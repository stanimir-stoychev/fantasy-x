import 'styled-components';
import { Theme } from '../clients/shared/styles';

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}
