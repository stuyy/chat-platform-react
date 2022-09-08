import { FC } from 'react';
import { MessageItemAvatar } from '../../utils/styles';
import { User } from '../../utils/types';

type Props = {
    user?: User;
    size: number;
  };

// Function to generate a seeded random number, used for the avatar
function randomseed(seed: number, min: number, max: number) {
    var x = Math.sin(seed++) * 10000;
    return Math.round(((x - Math.floor(x)) * max) + min);
}
  
// Set of avatar colors (currently, 12 colors)
let AVATAR_COLORS_SET = [
'#5794f7', '#9571f0', '#db7d35', '#db5127',
'#dbaa2c', '#edce80', '#86f078', '#57d147',
'#47d1b8', '#4947d1', '#d892e8', '#e66381'
]

// NOTE: Currently this is only applied in the message and in the GC members sidebar
// But I'm pretty sure you can apply it anywhere you want an avatar to be and it'll work
  
export const ItemAvatarContainer: FC<Props> = ({
    user,
    size
}) => {
return (
    <MessageItemAvatar
        style={{
            background: `${AVATAR_COLORS_SET[
                randomseed(user?.id || 0, 0, AVATAR_COLORS_SET.length)
              ]||AVATAR_COLORS_SET[0]}`,
            width: `${size}px`,
            height: `${size}px`,
        }}
    ></MessageItemAvatar>
);
};