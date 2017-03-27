FROM golang
MAINTAINER Geoff Gerrietts <geoff@gerrietts.net>

ADD ./vendor /go/src/github.com/ggerrietts/lemons/vendor
ADD . /go/src/github.com/ggerrietts/lemons/
RUN go get -d -v github.com/ggerrietts/lemons/...
RUN go install -v github.com/ggerrietts/lemons/...

CMD ["/go/bin/lemonapi"]
EXPOSE 4242
