import rndstr from "rndstr";
import { define } from "./define";

export default define('seed', 'シード値を適当に生成します。マイクラのシード値に悩んでいる場合お使いください', () => rndstr('a-zA-Z0-9', 32));
