from machine import Pin, Timer
import neopixel
import urandom
import time

STATE = {
    'hour': 21,
    'minute': 19,
    'display': '21:19',
    'pixels': None,
    'color': None,
    'style': 'WORD',
}

CLOCK_TIMER = None
NEOPIXEL = None

PHASE_IT_IS = [0, 1, 3, 4]
OCLOCK = [115, 116, 117, 118, 119, 120]
PAST = [39, 40, 41, 42]
TO = [36, 37]

HOUR_WORD_MAP = {
    0: [66, 67, 68, 69, 70, 71, 72, 73],
    1: [99, 100, 101],
    2: [85, 86, 87],
    3: [105, 106, 107, 108, 109],
    4: [110, 111, 112, 113],
    5: [77, 78, 79, 80],
    6: [102, 103, 104],
    7: [45, 46, 47, 48, 49],
    8: [94, 95, 96, 97, 98],
    9: [81, 82, 83, 84],
    10: [74, 75, 76],
    11: [88, 89, 90, 91, 92, 93],
    12: [51, 52, 53, 54],
}

MINUTE_WORD_MAP = {
    0: [],
    5: [29, 30, 31, 32],
    10: [12, 13, 14],
    15: [15, 16, 17, 18, 19, 20, 21],
    20: [22, 23, 24, 25, 26, 27],
    25: [22, 23, 24, 25, 26, 27, 29, 30, 31, 32],
    30: [6, 7, 8, 9],
    35: [22, 23, 24, 25, 26, 27, 29, 30, 31, 32],
    40: [22, 23, 24, 25, 26, 27],
    45: [15, 16, 17, 18, 19, 20, 21],
    50: [12, 13, 14],
    55: [29, 30, 31, 32],
    60: [],
}

ANALOG_OUTSIDE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
           21, 22, 32, 33, 43, 44, 54, 55, 65, 66,
           76, 77, 87, 88, 98, 99, 109, 110, 111,
           112, 113, 114, 115, 116, 117, 118, 119,
           120
           ]

HOUR_ANALOG_MAP = {
    0: [60, 49, 38, 27],
    1: [60, 49, 39, 29],
    2: [60, 61, 51, 41],
    3: [60, 61, 62, 63],
    4: [60, 61, 73, 85],
    5: [60, 71, 83, 95],
    6: [60, 71, 82, 93],
    7: [60, 71, 81, 91],
    8: [60, 59, 69, 79],
    9: [60, 59, 58, 57],
    10: [60, 59, 47, 35],
    11: [60, 49, 37, 25],
    12: [60, 49, 38, 27],
}

MINUTE_ANALOG_MAP = {
    0: [60, 49, 38, 27, 16, 5],
    5: [60, 49, 39, 29, 19, 9],
    10: [60, 61, 51, 41, 31, 21],
    15: [60, 61, 62, 63, 64, 65],
    20: [60, 61, 73, 85, 97, 109],
    25: [60, 71, 83, 95, 107, 119],
    30: [60, 71, 82, 93, 104, 115],
    35: [60, 71, 81, 91, 101, 111],
    40: [60, 59, 69, 79, 89, 99],
    45: [60, 59, 58, 57, 56, 55],
    50: [60, 59, 47, 35, 23, 11],
    55: [60, 49, 37, 25, 13, 1],
    60: [60, 49, 38, 27, 16, 5],
}


def randint():
    return urandom.getrandbits(11) % 255


def randcolor():
    return (randint(), randint(), randint())


def display_off(color=(0, 0, 0)):
    for i in range(NEOPIXEL.n):
        NEOPIXEL[i] = color
    NEOPIXEL.write()


def display_on(color=(255, 255, 255)):
    for i in range(NEOPIXEL.n):
        NEOPIXEL[i] = color
    NEOPIXEL.write()


def display_write(pixels, color=(255, 255, 255)):
    for i in pixels:
        NEOPIXEL[i] = color
    NEOPIXEL.write()


def update_analog_display():
    global state
    hour = STATE['hour']
    # Round minute to nearest 5
    minute = int(5 * round(float(STATE['minute'])/5))

    minute_map = MINUTE_ANALOG_MAP
    hour_map = HOUR_ANALOG_MAP

    # Handle 60 and 0 the same here so that we dont get a color
    # change as we cross from minutes to to minutes past.
    if minute == 60:
        now = '{}:{}'.format(hour, 0)
        hour += 1
    else:
        now = '{}:{}'.format(hour, minute)

    if now != STATE['display']:
        STATE['display'] = now
        display_off()

        minute_words = minute_map[minute]

        if hour > 12:
            hour_words = hour_map[hour - 12]
        else:
            hour_words = hour_map[hour]

        # pixels = hour_words + minute_words

        red = (255, 75, 75)
        blue = (75, 75, 255)
        white = (255, 255, 255)
        display_write(minute_words, blue)
        display_write(hour_words, red)
        display_write([60], white)


def update_word_display():
    global state
    hour = STATE['hour']
    # Round minute to nearest 5
    minute = int(5 * round(float(STATE['minute'])/5))

    # Handle 60 and 0 the same here so that we dont get a color
    # change as we cross from minutes to to minutes past.
    if minute == 60:
        now = '{}:{}'.format(hour, 0)
    else:
        now = '{}:{}'.format(hour, minute)

    if now != STATE['display']:
        STATE['display'] = now
        # display_off()

        if minute == 60 or minute == 0:
            minute_words = MINUTE_WORD_MAP[minute]
        elif minute > 30:
            minute_words = MINUTE_WORD_MAP[minute] + TO
        else:
            minute_words = MINUTE_WORD_MAP[minute] + PAST


        if minute > 30:
            hour = (hour + 1) % 24

        if hour > 12:
            hour_words = HOUR_WORD_MAP[hour - 12]
        else:
            hour_words = HOUR_WORD_MAP[hour]

        pixels = PHASE_IT_IS + hour_words + minute_words

        if (minute == 60 or minute == 0) and hour != 0 and hour != 12:
            pixels += OCLOCK

        color = randcolor()

        fade_frames = 120

        if STATE['pixels']:

            pixels_to_turn_off = set(STATE['pixels']) - set(pixels)
            pixels_to_turn_on = set(pixels) - set(STATE['pixels'])
            pixels_to_change = set(STATE['pixels']) & set(pixels)

            fade_out_color = STATE['color']
            fade_out_step_r = (float(fade_out_color[0]) - 0.0) / fade_frames
            fade_out_step_g = (float(fade_out_color[1]) - 0.0) / fade_frames
            fade_out_step_b = (float(fade_out_color[2]) - 0.0) / fade_frames
            print 'Fade Out:'
            print fade_out_color, '->', (0, 0, 0), fade_out_step_r, fade_out_step_g, fade_out_step_b
            fade_in_color = (0, 0, 0)
            fade_in_step_r = (float(color[0]) - 0.0) / float(fade_frames)
            fade_in_step_g = (float(color[1]) - 0.0) / float(fade_frames)
            fade_in_step_b = (float(color[2]) - 0.0) / float(fade_frames)
            print 'Fade In:'
            print (40, 40, 40), '->', color, fade_in_step_r, fade_in_step_g, fade_in_step_b
            fade_change_color = STATE['color']
            fade_change_step_r = float(color[0] - fade_change_color[0]) / fade_frames
            fade_change_step_g = float(color[1] - fade_change_color[1]) / fade_frames
            fade_change_step_b = float(color[2] - fade_change_color[2]) / fade_frames
            print 'Fade Change:'
            print STATE['color'], '->', color, fade_change_step_r, fade_change_step_g, fade_change_step_b
            for _ in range(fade_frames):
                # print 'fading'
                fade_out_color = (
                    fade_out_color[0] - fade_out_step_r,
                    fade_out_color[1] - fade_out_step_g,
                    fade_out_color[2] - fade_out_step_b,
                )
                fade_in_color = (
                    fade_in_color[0] + fade_in_step_r,
                    fade_in_color[1] + fade_in_step_g,
                    fade_in_color[2] + fade_in_step_b,
                )
                fade_change_color = (
                    fade_change_color[0] + fade_change_step_r,
                    fade_change_color[1] + fade_change_step_g,
                    fade_change_color[2] + fade_change_step_b,
                )

                display_write(pixels_to_turn_off, (int(fade_out_color[0]), int(fade_out_color[1]), int(fade_out_color[2])))
                display_write(pixels_to_turn_on, (int(fade_in_color[0]), int(fade_in_color[1]), int(fade_in_color[2])))
                display_write(pixels_to_change, (int(fade_change_color[0]), int(fade_change_color[1]), int(fade_change_color[2])))

                time.sleep(1.0/60.0)

            print 'final fade_out_color: ', fade_out_color
            print 'final fade_in_color: ', fade_in_color
            print 'final fade_change_color: ', fade_change_color

            display_write(pixels_to_turn_off, (0, 0, 0))
            display_write(pixels_to_turn_on, color)
            display_write(pixels_to_change, color)
        else:
            display_write(pixels, color)

        STATE['pixels'] = pixels
        STATE['color'] = color


def update_time():
    previous_minute = STATE['minute']
    STATE['minute'] = (previous_minute + 1) % 60
    if STATE['minute'] < previous_minute:
        # Must call time.time at least once every 7 hours to cater of an
        # overflow of the internal RTOS clock.
        time.time()
        STATE['hour'] = (STATE['hour'] + 1) % 24


def tock(t):
    update_time()
    print "Tock {}:{}".format(STATE['hour'], STATE['minute'])
    if STATE['style'] == 'ANALOG':
        update_analog_display()
    else:
        update_word_display()


def begin():
    global CLOCK_TIMER
    global NEOPIXEL
    NEOPIXEL = neopixel.NeoPixel(Pin(4), 121)
    display_off()
    # CLOCK_TIMER = Timer(-1)
    # CLOCK_TIMER.init(period=60000, mode=Timer.PERIODIC, callback=tock)
    tock('dummy')


def end():
    CLOCK_TIMER.deinit()
