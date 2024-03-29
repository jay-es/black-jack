#!/bin/bash

sudo apt-get update
sudo apt-get install -y m4
sudo apt install -y rlwrap
sudo apt-get install -y inotify-tools

opam install dune
opam install merlin
opam install ocamlformat
opam install ppx_inline_test

# opam pin add ocaml-lsp-server https://github.com/ocaml/ocaml-lsp.git
opam pin add ocaml-lsp-server https://github.com/ocaml/ocaml-lsp/releases/download/1.4.1/jsonrpc-1.4.1.tbz
opam install ocaml-lsp-server

eval $(opam env)
