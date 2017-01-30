import requests

class NeoPixel(list):
    def __init__(self, pin, length):
        super(NeoPixel, self).__init__()
        self.n = length
        for i in range(length):
            self.append((0, 0, 0))


    def write(self):
        post_json = {
            "neoPixelArray": self
        }
        try:
            requests.post('http://localhost:8080', json=post_json)
        except:
            pass
