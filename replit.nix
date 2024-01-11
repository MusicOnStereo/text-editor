{ pkgs }: {
  deps = [
    pkgs.
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server  
  ];
}