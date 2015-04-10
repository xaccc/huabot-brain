package config

const (
    RES = "resourses"
    UPLOADPATH = "public/upload/"
    TRAIN_FILE = RES + "/train.txt"
    VAL_FILE = RES + "/val.txt"
    TRAIN_LMDB = RES + "/train_lmdb"
    VAL_LMDB = RES + "/val_lmdb"
    MEAN_FILE = RES + "/mean.binaryproto"
    SOLVER_FILE = RES + "/solver.prototxt"
    LOG_DIR = RES + "/logs"
    PLOT_ROOT = RES + "/plot"
)

var FILE_EXTS = map[string]string{
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/gif": ".gif",
}
