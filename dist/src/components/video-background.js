"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const VideoBackground = () => {
    return (react_1.default.createElement("div", { id: "video-container" },
        react_1.default.createElement("video", { autoPlay: true, loop: true, muted: true },
            react_1.default.createElement("source", { src: "./videos/whetherweatherbackgroundvideo.mp4", type: "video/mp4" }),
            "Your browser does not support the video tag.")));
};
exports.default = VideoBackground;
