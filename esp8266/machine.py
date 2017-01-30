from threading import Timer as TTimer

class Timer(object):
    PERIODIC = 'PERIODIC'

    ENABLED = 'ENABLED'
    DISABLED = 'DISABLED'

    def __init__(self, id):
        self.id = id
        self.period = 0
        self.mode = Timer.PERIODIC
        self.callback = None
        self.status = Timer.DISABLED

    def init(self, period, mode, callback):
        self.period = period / 1000
        self.mode = mode
        self.callback = callback
        self.status = Timer.ENABLED
        TTimer(self.period, self.run, ()).start()

    def deinit(self):
        self.status = Timer.DISABLED

    def run(self):
        if self.status == Timer.ENABLED:
            self.callback('dummy')
            if self.mode == Timer.PERIODIC:
                TTimer(self.period, self.run, ()).start()


class Pin(object):
    def __init__(self, pin):
        self.pin = pin
