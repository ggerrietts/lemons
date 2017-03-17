FROM golang
MAINTAINER Geoff Gerrietts <geoff@gerrietts.net>

ADD . /go/src/github.com/ggerrietts/lemons/svc
RUN go get -d -v github.com/ggerrietts/lemons/svc/...
RUN go install -v github.com/ggerrietts/lemons/svc/...

CMD ["/go/bin/lemonapi"]
EXPOSE 4242
